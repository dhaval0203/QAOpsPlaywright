Feature: Ecommerce validations  
    @Validation
    Scenario Outline: Placing the Order
      Given a login to Ecommerce2 application with "<username>" and "<password>"
      Then Verify Error message is displayed

      Examples:
        | username            | password  |
        | rahulshettyacademy  | Root@1234 |
        | hello@123.com       | hello123  |