package com.AI_Powered_E_Commerce.repository;



import com.AI_Powered_E_Commerce.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository
        extends JpaRepository<Order, Long> {
}