package org.lamisplus.modules.covid.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "schema-installer-covid-vaccination",
        description = "Installs the required vaccination covid tables",
        version = 1)
public class SchemaInstaller2 extends AcrossLiquibaseInstaller {
    public SchemaInstaller2() {
        super("classpath:installers/covid/schema/schema-2.xml");
    }
}
