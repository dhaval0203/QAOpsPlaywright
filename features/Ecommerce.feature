Feature: Ecommerce validations  
    @Regression
    Scenario: Placing the Order
      Given a login to Ecommerce application with "dhaval.ghodasara@testmail.com" and "Root@1234"
      When Add "ZARA COAT 3" to the cart
      Then Verify "ZARA COAT 3" is displayed in the cart
      When Enter Valid details like "1234 5678 5678 1234","03","02","584","JKriva","dhaval.ghodasara@testmail.com" and place the order
      Then Verify order present in the Order History

    @Validation
    Scenario Outline: Placing the Order
      Given a login to Ecommerce2 application with "<username>" and "<password>"
      Then Verify Error message is displayed

      Examples:
        | username            | password  |
        | rahulshettyacademy  | Root@1234 |
        | hello@123.com       | hello123  |