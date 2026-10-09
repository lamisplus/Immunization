package org.lamisplus.modules.immunization.repository;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfSystemProperty;
import org.lamisplus.modules.immunization.domain.entity.Immunization;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.w3c.dom.NodeList;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Runs the repository's native SQL against a real PostgreSQL database built
 * from this module's own Liquibase changelogs. Opt-in (needs a disposable
 * database):
 *   mvn test -Dtest=ImmunizationRepositoryIT -DfailIfNoTests=false
 *       -Dimmunization.it.db.url=jdbc:postgresql://127.0.0.1:54329/immunization_it
 *       -Dimmunization.it.db.user=it
 * The database's immunization and patient_person tables are dropped and recreated.
 */
@EnabledIfSystemProperty(named = "immunization.it.db.url", matches = ".+")
class ImmunizationRepositoryIT {

    private static final String UUID_29262 = "5d1c7d2e-0000-4000-8000-000000029262";
    private static final String UUID_29270 = "5d1c7d2e-0000-4000-8000-000000029270";
    private static final String UUID_29999 = "5d1c7d2e-0000-4000-8000-000000029999";

    private static EntityManagerFactory entityManagerFactory;
    private static EntityManager entityManager;
    private static ImmunizationRepository repository;

    @BeforeAll
    static void setUp() throws Exception {
        DriverManagerDataSource dataSource = new DriverManagerDataSource(
                System.getProperty("immunization.it.db.url"),
                System.getProperty("immunization.it.db.user", "postgres"),
                System.getProperty("immunization.it.db.password", ""));
        JdbcTemplate jdbc = new JdbcTemplate(dataSource);
        jdbc.execute("DROP TABLE IF EXISTS public.immunization CASCADE");
        jdbc.execute("DROP SEQUENCE IF EXISTS immunization_id_seq");
        jdbc.execute("DROP TABLE IF EXISTS public.patient_person");
        for (String changelog : Arrays.asList("schema-5.xml", "schema-6.xml")) {
            for (String sql : changelogSql("installers/immunization/schema/" + changelog)) {
                jdbc.execute(sql);
            }
        }
        // Only the patient_person columns this module reads.
        jdbc.execute("CREATE TABLE public.patient_person (id bigint PRIMARY KEY, uuid varchar(100), archived integer)");
        jdbc.update("INSERT INTO patient_person VALUES (29262, ?, 0), (29270, ?, 0), (29999, ?, 1)",
                UUID_29262, UUID_29270, UUID_29999);

        insert(jdbc, 29270L, "ROUTINE_IMMUNIZATION", "2026-09-16", 0,
                snapshot("Test", "Sync", "[{\"type\":\"HospitalNumber\",\"value\":\"3445678fgh\"}]"));   // id 1
        insert(jdbc, 29262L, "ROUTINE_IMMUNIZATION", "2026-09-16", 0,
                snapshot("Ebelebe", "Ake", "[{\"type\":\"HospitalNumber\",\"value\":\"23434r3556\"}]")); // id 2
        insert(jdbc, 29262L, "TETANUS_IMMUNIZATION", "2026-09-16", 0,
                snapshot("Ebelebe", "Ake", "[{\"type\":\"HospitalNumber\",\"value\":\"23434r3556\"}]")); // id 3
        insert(jdbc, null, "TETANUS_IMMUNIZATION", "2026-10-01", 1, "{}");                              // id 4
        insert(jdbc, 29262L, "TETANUS_IMMUNIZATION", "2026-10-01", 1,
                snapshot("Ebelebe", "Ake", "[]"));                                                    // id 5
        insert(jdbc, 30000L, "ROUTINE_IMMUNIZATION", "2026-08-01", 0,
                snapshot("Ada", "50%_off", "[]"));                                                    // id 6
        insert(jdbc, 29262L, "ROUTINE_IMMUNIZATION", "2026-10-05", 0,
                snapshot("Ebelebe", "Ake", "[{\"type\":\"HospitalNumber\",\"value\":\"23434r3556\"}]")); // id 7
        insert(jdbc, 30001L, "TETANUS_IMMUNIZATION", "2026-07-01", 0,
                "{\"patientDto\":{\"firstName\":\"Odd\",\"surname\":\"Shape\",\"identifier\":\"not-an-object\"}}"); // id 8
        insert(jdbc, 30002L, "TETANUS_IMMUNIZATION", "2026-07-01", 0, "{}");                            // id 9

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("org.lamisplus.modules.immunization.domain.entity");
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        Properties jpa = new Properties();
        jpa.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQL95Dialect");
        jpa.setProperty("hibernate.hbm2ddl.auto", "none");
        // Entities come from packagesToScan; Hibernate's own class-file
        // scanner (old javassist) cannot read Java 8 lambdas in test classes.
        jpa.setProperty("hibernate.archive.scanner", "org.hibernate.boot.archive.scan.internal.DisabledScanner");
        factory.setJpaProperties(jpa);
        factory.afterPropertiesSet();
        entityManagerFactory = factory.getObject();
        entityManager = entityManagerFactory.createEntityManager();
        repository = new JpaRepositoryFactory(entityManager).getRepository(ImmunizationRepository.class);
    }

    @AfterAll
    static void tearDown() {
        if (entityManager != null) entityManager.close();
        if (entityManagerFactory != null) entityManagerFactory.close();
    }

    private static List<String> changelogSql(String resource) throws Exception {
        try (InputStream in = new ClassPathResource(resource).getInputStream()) {
            NodeList nodes = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(in)
                    .getElementsByTagName("sql");
            List<String> statements = new ArrayList<>();
            for (int i = 0; i < nodes.getLength(); i++) statements.add(nodes.item(i).getTextContent());
            return statements;
        }
    }

    private static String snapshot(String firstName, String surname, String identifiers) {
        return "{\"vaccineType\":[\"X\"],\"patientDto\":{\"firstName\":\"" + firstName + "\",\"surname\":\""
                + surname + "\",\"identifier\":{\"identifier\":" + identifiers + "}}}";
    }

    private static void insert(JdbcTemplate jdbc, Long patientId, String type, String date, int archived, String data) {
        jdbc.update("INSERT INTO immunization (patient_id, patient_uuid, immunization_type, vaccination_date, " +
                        "unique_immunization_data, archived) VALUES (?, ?, ?, ?::date, ?::jsonb, ?)",
                patientId, patientId == null ? null : UUID.randomUUID().toString(), type, date, data, archived);
    }

    private static List<Long> ids(Page<Immunization> page) {
        return page.getContent().stream().map(Immunization::getId).collect(Collectors.toList());
    }

    private static List<Long> patientIds(Page<Immunization> page) {
        return page.getContent().stream().map(Immunization::getPatientId).collect(Collectors.toList());
    }

    @Test
    void patientHistoryPagesAreOrderedNewestFirstWithoutOverlap() {
        Page<Immunization> first = repository.getPagedByPatientIdAndArchived(29262L, 0, PageRequest.of(0, 2));
        Page<Immunization> second = repository.getPagedByPatientIdAndArchived(29262L, 0, PageRequest.of(1, 2));

        assertEquals(Arrays.asList(7L, 3L), ids(first));
        assertEquals(Collections.singletonList(2L), ids(second));
        assertEquals(3, first.getTotalElements());
        assertEquals(2, first.getTotalPages());
        assertNotNull(first.getContent().get(0).getUniqueImmunizationData().get("patientDto"));
    }

    @Test
    void allHistoryExcludesArchivedAndIsOrdered() {
        Page<Immunization> page = repository.getAllPaged(PageRequest.of(0, 50));
        assertEquals(Arrays.asList(7L, 3L, 2L, 1L, 6L, 9L, 8L), ids(page));
        assertEquals(7, page.getTotalElements());
    }

    @Test
    void vaccinatedPatientsAreOneRowEachUsingTheLatestRecord() {
        Page<Immunization> page = repository.getLatestPerPatient("", "%%", PageRequest.of(0, 10));

        assertEquals(Arrays.asList(7L, 1L, 6L, 9L, 8L), ids(page));
        assertEquals(5, page.getTotalElements());
        assertFalse(patientIds(page).contains(null), "records without a patient are not listed");
    }

    @Test
    void vaccinatedPatientPagesCountPatientsNotRecords() {
        Page<Immunization> first = repository.getLatestPerPatient("", "%%", PageRequest.of(0, 2));
        Page<Immunization> second = repository.getLatestPerPatient("", "%%", PageRequest.of(1, 2));
        Page<Immunization> third = repository.getLatestPerPatient("", "%%", PageRequest.of(2, 2));

        assertEquals(5, first.getTotalElements());
        assertEquals(3, first.getTotalPages());
        Set<Long> seen = new HashSet<>();
        for (Page<Immunization> page : Arrays.asList(first, second, third)) {
            for (Long patientId : patientIds(page)) assertTrue(seen.add(patientId), "patient listed twice: " + patientId);
        }
        assertEquals(5, seen.size());
    }

    @Test
    void vaccinatedPatientsCanBeSearchedByNameOrIdentifier() {
        assertEquals(Collections.singletonList(29262L),
                patientIds(repository.getLatestPerPatient("ake", "%ake%", PageRequest.of(0, 10))));
        assertEquals(Collections.singletonList(29262L),
                patientIds(repository.getLatestPerPatient("ebelebe ake", "%ebelebe ake%", PageRequest.of(0, 10))));
        assertEquals(Collections.singletonList(29270L),
                patientIds(repository.getLatestPerPatient("3445678", "%3445678%", PageRequest.of(0, 10))));

        Page<Immunization> none = repository.getLatestPerPatient("zzz", "%zzz%", PageRequest.of(0, 10));
        assertTrue(none.getContent().isEmpty());
        assertEquals(0, none.getTotalElements());
    }

    @Test
    void searchTreatsLikeWildcardsLiterally() {
        // The service escapes % and _; "50%" must not match everything.
        assertEquals(Collections.singletonList(30000L),
                patientIds(repository.getLatestPerPatient("50%", "%50\\%%", PageRequest.of(0, 10))));
    }

    @Test
    void searchCountMatchesSearchResults() {
        Page<Immunization> page = repository.getLatestPerPatient("e", "%e%", PageRequest.of(0, 1));
        // Ebelebe Ake, Test Sync (surname has no e but first name does), Odd Shape.
        assertEquals(3, page.getTotalElements());
        assertEquals(1, page.getContent().size());
    }

    @Test
    void activePatientCheckRequiresMatchingIdUuidAndActiveStatus() {
        assertTrue(repository.activePatientExists(29262L, UUID_29262));
        assertFalse(repository.activePatientExists(29262L, UUID_29270), "uuid of another patient");
        assertFalse(repository.activePatientExists(29999L, UUID_29999), "archived patient");
        assertFalse(repository.activePatientExists(424242L, UUID_29262), "unknown patient");
    }
}
