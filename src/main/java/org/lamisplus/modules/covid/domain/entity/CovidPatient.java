package org.lamisplus.modules.covid.domain.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "covid_patient")
@TypeDefs({
        @TypeDef(name = "string-array", typeClass = StringArrayType.class),
        @TypeDef(name = "int-array", typeClass = IntArrayType.class),
        @TypeDef(name = "json", typeClass = JsonStringType.class),
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
        @TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class),
        @TypeDef(name = "json-node", typeClass = JsonNodeStringType.class),
})
public class CovidPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "mid_name")
    private String midName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "participant_id")
    private String participantId;
    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "gender")
    private JsonNode gender;
    @Column(name = "dob")
    private LocalDate dob;
    //@Column(name = "phone")
    //private String phone;
    @Column(name = "current_status")
    private String currentStatus;
    @Column(name = "vaccination_status")
    private String vaccinationStatus;
    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "address")
    private JsonNode address;
    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "contact_point")
    private JsonNode contactPoint;
}
