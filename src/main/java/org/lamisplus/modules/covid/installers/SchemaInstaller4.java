package org.lamisplus.modules.covid.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(4)
@Installer(name = "J&J vaccine",
        description = "Add J&J vaccine to list",
        version = 1)
public class SchemaInstaller4 extends AcrossLiquibaseInstaller {
    public SchemaInstaller4() {
        super("classpath:installers/covid/schema/schema-4.xml");
    }
}
