package org.lamisplus.modules.immunization.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "schema-installer-routine-immunization-jsonb-fix",
        description = "Converts unique_immunization_data to jsonb to match the entity mapping",
        version = 1)
public class SchemaInstaller6 extends AcrossLiquibaseInstaller {
    public SchemaInstaller6() {
        super("classpath:installers/immunization/schema/schema-6.xml");
    }
}
