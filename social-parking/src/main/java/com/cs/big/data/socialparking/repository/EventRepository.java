package com.cs.big.data.socialparking.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cs.big.data.socialparking.entity.Event;


@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

}
