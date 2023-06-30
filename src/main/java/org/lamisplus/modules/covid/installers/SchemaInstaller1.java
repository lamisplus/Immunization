package org.lamisplus.modules.covid.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "schema-installer-covid",
        description = "Installs the required covid tables",
        version = 1)
public class SchemaInstaller1 extends AcrossLiquibaseInstaller {
    public SchemaInstaller1() {
        super("classpath:installers/covid/schema/schema-1.xml");
    }
}
