x = float(input("Enter the first number: "))
y = float(input("Enter the second number: "))
addition = x + y 
subtraction = x - y
multiplication = x * y
if y != 0:
    division = x / y
else:
    division = "Undefined (cannot divide by zero)"
print("\nResults:")
print(f"Addition: {addition}")
print(f"Subtraction: {subtraction}")
print(f"Multiplication: {multiplication}")
print(f"Division: {division}")
