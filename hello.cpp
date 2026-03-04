// Tech me copy constructor in cpp

#include <iostream>
using namespace std;

class MyClass {
public:
    int value;  

    // Default constructor
    MyClass(int v = 0) : value(v) {}

    // Copy constructor
    MyClass(const MyClass &obj) {
        value = obj.value;
    }
};

int main() {
    MyClass obj1(10);  // Create an object with value 10
    MyClass obj2 = obj1;  // Use the copy constructor to create a new object
    //if there is no copy constrcutor then slicing will happen and obj2 will have value 0

    // MyClass obj2(obj1);  // Another way to call the copy constructor

    //Deep copy vs shallow copy
    //In this example, the copy constructor performs a deep copy by copying the value of obj1 to obj2. If we had a pointer member variable, we would need to allocate new memory for obj2 and copy the contents of the memory pointed to by obj1 to avoid issues with shared memory (shallow copy).
    //example of shallow copy
    // class MyClass {
    // public:
    //     int *value;
    //     // Default constructor
    //     MyClass(int v = 0) {
    //         value = new int(v);
    //     }
    //     // Copy constructor (deep copy)
    //     MyClass(const MyClass &obj) {
    //         value = new int(*(obj.value));
    //     }
    //     // Destructor
    //     ~MyClass() {
    //         delete value;
    //     }

    // Shallow copy would be:
    //     MyClass(const MyClass &obj) {
    //         value = obj.value; // This would lead to both obj1 and obj2 pointing to the same memory location, which can cause issues when one of them is modified or destroyed.
    // this is done by compiler by default if we do not define a copy constructor, but it can lead to problems like double deletion if both objects are destroyed and try to free the same memory.

    cout << "Value of obj1: " << obj1.value << endl;  // Output: 10
    cout << "Value of obj2: " << obj2.value << endl;  // Output: 10

    return 0;
}