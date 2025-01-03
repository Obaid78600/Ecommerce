package in.krloyar.ecommerce.controller;

import in.krloyar.ecommerce.dto.Purchase;
import in.krloyar.ecommerce.dto.PurchaseResponse;
import in.krloyar.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private final CheckoutService cs;

    CheckoutController(CheckoutService cs){
        this.cs = cs;
    }

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello, Have a Good Day, How may I help you?";
    }

    @PostMapping("/myName")
    public String sayMyName(@RequestParam("myName") String name){
        return "Hello " + name + "How may I help you?";
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        return cs.placeOrder(purchase);
    }
}

// endpoint : localhost:8080/checkout/hello
// endpoint : localhost:8080/checkout/myName
// endpoint : localhost:8080/checkout/purchase