package com.website.website;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoBlockRepository extends JpaRepository<InfoBlock, Long> {
}
