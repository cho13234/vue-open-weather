package com.hli.study.springboot.restapi.config;

import java.nio.charset.Charset;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
//    	List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
//    	MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
//    	MappingJackson2XmlHttpMessageConverter converter2 = new MappingJackson2XmlHttpMessageConverter();
//    	converter.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
//    	converter2.setSupportedMediaTypes(Collections.singletonList(MediaType.ALL));
//    	messageConverters.add(converter);
//    	messageConverters.add(converter2);
//    	messageConverters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
        return restTemplateBuilder
            .requestFactory(() -> new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()))
            .setConnectTimeout(Duration.ofMillis(5000))
            .setReadTimeout(Duration.ofMillis(5000))
//            .additionalMessageConverters(messageConverters)
            .additionalMessageConverters(new StringHttpMessageConverter(Charset.forName("UTF-8")))
            .build();
    }
}
