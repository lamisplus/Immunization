package org.lamisplus.modules.covid.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(3)
@Installer(name = "schema-installer-covid-vaccination-update_tables",
        description = "Update existing vaccination tables",
        version = 1)
public class SchemaInstaller3 extends AcrossLiquibaseInstaller {
    public SchemaInstaller3() {
        super("classpath:installers/covid/schema/schema-3.xml");
    }
}
