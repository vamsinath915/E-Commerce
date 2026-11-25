package com.AI_Powered_E_Commerce.service;



import com.AI_Powered_E_Commerce.entity.Order;
import com.AI_Powered_E_Commerce.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(
            OrderRepository orderRepository) {

        this.orderRepository = orderRepository;
    }

    public Order placeOrder(Order order) {

        double total = 0;

        for (var item : order.getItems()) {

            total +=
                    item.getPrice()
                    * item.getQuantity();
        }

        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order not found"
                        )
                );
    }
}