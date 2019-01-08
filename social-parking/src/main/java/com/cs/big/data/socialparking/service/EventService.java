package com.cs.big.data.socialparking.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cs.big.data.socialparking.entity.Event;
import com.cs.big.data.socialparking.repository.EventRepository;

@Service
@Transactional
public class EventService {

	@Autowired
	EventRepository eventRepository;
	
	@PersistenceContext
	EntityManager em;
	
	public List<Event> getFreeSpaces() {
		return em.createQuery("from Event where isFree = 0").getResultList();
	}
	
	public List<Event> getOccupiedSpaces() {
		return em.createQuery("from Event where isFree = 1").getResultList();
	}
}
