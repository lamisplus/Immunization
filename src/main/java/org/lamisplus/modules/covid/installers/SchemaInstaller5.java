package org.lamisplus.modules.covid.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer-routine-immunization",
        description = "Installs the required RI table",
        version = 1)
public class SchemaInstaller5 extends AcrossLiquibaseInstaller {
    public SchemaInstaller5() {
        super("classpath:installers/covid/schema/schema-5.xml");
    }
}
