package com.hli.study.springboot.business.controller;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hli.study.springboot.restapi.service.ApiService;

@RestController
@RequestMapping("/api/weather")
public class RestWeatherController {

    private ApiService<Map<String, Object>> apiService;
    
    @Autowired
    public RestWeatherController(ApiService<Map<String, Object>> apiService) {
    	this.apiService = apiService;
	}
    
    @GetMapping("/nowcast")
	public ResponseEntity<Map<String, Object>> nowcast(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String baseDate, @RequestParam String baseTime, 
			@RequestParam String nx, @RequestParam String ny) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		//String numOfRows = "50";
		//String pageNo = "1";
		String dataType = "JSON";
		//String baseDate = "20210929";
		//String baseTime = "1400";
		//String nx = "60";
		//String ny = "127";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&dataType=" + dataType)
			.append("&base_date=" + baseDate)
			.append("&base_time=" + baseTime)
			.append("&nx=" + nx)
			.append("&ny=" + ny);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}
    
    @GetMapping("/forecast")
	public ResponseEntity<Map<String, Object>> forecast(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String baseDate, @RequestParam String baseTime, 
			@RequestParam String nx, @RequestParam String ny) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		//String numOfRows = "50";
		//String pageNo = "1";
		String dataType = "JSON";
		//String baseDate = "20210929";
		//String baseTime = "1400";
		//String nx = "60";
		//String ny = "127";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&dataType=" + dataType)
			.append("&base_date=" + baseDate)
			.append("&base_time=" + baseTime)
			.append("&nx=" + nx)
			.append("&ny=" + ny);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}
    
    @GetMapping("/getCtprvnMesureList")
	public ResponseEntity<Map<String, Object>> getCtprvnMesureList(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String itemCode) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		String returnType = "json";
		String dataGubun = "HOUR";
		String searchCondition = "WEEK";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&returnType=" + returnType)
			.append("&itemCode=" + itemCode)
			.append("&dataGubun=" + dataGubun)
			.append("&searchCondition=" + searchCondition);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}

	/**
	 * http://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit
	 * ?serviceKey=0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D
	 * &pageNo=1
	 * &numOfRows=10
	 * &dataType=JSON
	 * &sat=G2
	 * &data=ir105
	 * &area=ko
	 * &time=20211004
	 */
    @GetMapping("/getInsightSatlit")
	public ResponseEntity<Map<String, Object>> getInsightSatlit(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String sat, @RequestParam String data, @RequestParam String time) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		String dataType = "JSON";
		String area = "ko";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&dataType=" + dataType)
			.append("&sat=" + sat)
			.append("&data=" + data)
			.append("&area=" + area)
			.append("&time=" + time);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}

	/**
	 * http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst
	 * ?serviceKey=0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D
	 * &pageNo=1
	 * &numOfRows=100
	 * &dataType=JSON
	 * &regId=11B00000
	 * &tmFc=202110041800
	 */
    @GetMapping("/getMidLandFcst")
	public ResponseEntity<Map<String, Object>> getMidLandFcst(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String regId, @RequestParam String tmFc) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		String dataType = "JSON";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&dataType=" + dataType)
			.append("&regId=" + regId)
			.append("&tmFc=" + tmFc);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}

	/**
	 * http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa
	 * ?serviceKey=0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D
	 * &pageNo=1
	 * &numOfRows=100
	 * &dataType=JSON
	 * &regId=11B10101
	 * &tmFc=202110041800
	 */
    @GetMapping("/getMidTa")
	public ResponseEntity<Map<String, Object>> getMidTa(@RequestParam String pageNo, @RequestParam String numOfRows, 
			@RequestParam String regId, @RequestParam String tmFc) throws UnsupportedEncodingException, URISyntaxException {
		String baseUrl = "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa";
		String serviceKey = "0Qq4%2F%2BtFazjNl72XbGzxRAZ8kEn1dN%2B7NRrEAtEzpVE8GBCwRchbAVTO%2BUZJEMvXxLR7Y6yxj3GqSQwkwkBd3A%3D%3D";
		String dataType = "JSON";
		
		String serviceKeyDecoded = URLDecoder.decode(serviceKey, "UTF-8");
		
		StringBuilder urlBuilder = new StringBuilder(baseUrl);
		urlBuilder.append("?serviceKey=" + URLEncoder.encode(serviceKeyDecoded, "UTF-8"))
			.append("&pageNo=" + pageNo)
			.append("&numOfRows=" + numOfRows)
			.append("&dataType=" + dataType)
			.append("&regId=" + regId)
			.append("&tmFc=" + tmFc);
		
		System.out.println(urlBuilder.toString());
		
		ResponseEntity<Map<String, Object>> res = apiService.get(new URI(urlBuilder.toString()), HttpHeaders.EMPTY);
		
		System.out.println(res);
		
		return res;
	}
}
