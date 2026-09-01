package org.movielib.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void mainMethodStarts() {
        // Ruft die main-Methode auf, um die Zeilenabdeckung zu erfüllen
        BackendApplication.main(new String[] {});
    }
}
