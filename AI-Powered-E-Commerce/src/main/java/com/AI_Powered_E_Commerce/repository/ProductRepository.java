package com.AI_Powered_E_Commerce.repository;



import com.AI_Powered_E_Commerce.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByNameContainingIgnoreCase(String name);
}
