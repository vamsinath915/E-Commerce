package com.AI_Powered_E_Commerce.controller;



import com.AI_Powered_E_Commerce.entity.Order;
import com.AI_Powered_E_Commerce.service.OrderService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(
            @RequestBody Order order) {

        return orderService.placeOrder(order);
    }

    @GetMapping
    public List<Order> getOrders() {

        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrder(
            @PathVariable Long id) {

        return orderService.getOrderById(id);
    }
}
