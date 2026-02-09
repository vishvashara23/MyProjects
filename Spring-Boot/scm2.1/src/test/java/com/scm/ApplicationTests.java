package com.scm;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import com.scm.services.EmailService;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ApplicationTests {


	void contextLoads() {
	}
	
	
    private EmailService service;

	public ApplicationTests(EmailService service) {
		this.service = service;
	}

	@Test
	 void  sendEmail() {
		service.sendEmail("asharavishv238@gmail.com", "testing a mail services ", "testing mail  ");
	}
	
	

//	void testUnits() {
//
//
//		int result=40;
//
//		 List<String>  list = List.of("ram","shyam","ankit");
//
////		assertThat(result).isEqualTo(50);
//
//		 assertThat(list).asList().size().isGreaterThan(5);
//
//
//
//
//	}

}
