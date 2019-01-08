package com.cs.big.data.socialparking.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.big.data.socialparking.entity.Event;
import com.cs.big.data.socialparking.repository.EventRepository;
import com.cs.big.data.socialparking.service.EventService;

@RestController
@CrossOrigin(origins = "*")
public class EventController {
	
	@Autowired
	EventRepository eventRepository;
	
	@Autowired
	EventService eventService;
	
//	@PostConstruct
//	private void populateEvent() {
//		Date d1 = new Date();
//		Date d2=  new Date();
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
//		d2.setHours(10);
//		d2.setYear(2017);
//		d2.setMonth(5);
//		d2.setDate(21);
//		
//		Event e1 = new Event(12.45, 45.32, d1, "dfhdh", "event1.jpg", false);
//		Event e2 = new Event(78.22, 50.19, d2, "dfhdf", "event2.jpg", true);
//		eventRepository.save(e1);
//		eventRepository.save(e2);
//	}
	
	@GetMapping(value="/events")
	public List<Event> getAllEvents() {
		return (List<Event>) eventRepository.findAll();
	}
	
	@GetMapping(value="/event/{id}")
	public Optional<Event> getAllEvents(@PathVariable Long id) {
		return eventRepository.findById(id);
	}
	
	@GetMapping(value="/events/free")
	public List<Event> getFreeSpaces() {
		return eventService.getFreeSpaces();
	}
	
	@GetMapping(value="/events/occupied")
	public List<Event> getOccupiedSpaces() {
		return eventService.getOccupiedSpaces();
	}
	
	@PostMapping(value = "/event")
	public String insertCourse(@RequestBody Event e) {
		e.setReportedAt(new Date());
		eventRepository.save(e);
		return "Done";
	}
}
