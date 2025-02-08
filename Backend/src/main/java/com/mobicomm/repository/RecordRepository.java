package com.mobicomm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.mobicomm.entity.Records;

@Repository
@Component
public interface RecordRepository extends JpaRepository<Records,Long>{
	List<Records> findAll();
}
