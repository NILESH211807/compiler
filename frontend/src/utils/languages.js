import jsIcon from '@/assets/images/javascript.svg';
import pythonIcon from '@/assets/images/python.svg';
import javaIcon from '@/assets/images/java.svg';
import cppIcon from '@/assets/images/cpp.svg';
import cIcon from '@/assets/images/c.svg';
import rustIcon from '@/assets/images/rust.svg';
import goIcon from '@/assets/images/go.svg';
import phpIcon from '@/assets/images/php.svg';

export const Languages = [
    {
        name: "JavaScript",
        value: "javascript",
        icon: jsIcon,
        code: `// Write your code here        
console.log('Hello World');`,
    },
    {
        name: "Python",
        value: "python",
        icon: pythonIcon,
        code: `# Write your code here
print('Hello World')`,
    },
    {
        name: "Java",
        value: "java",
        icon: javaIcon,
        code: `// Write your code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    },
    {
        name: "C++",
        value: "cpp",
        icon: cppIcon,
        code: `// Write your code here
#include <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
    },
    {
        name: "C",
        value: "c",
        icon: cIcon,
        code: `// Write your code here
#include <stdio.h>
int main() {
    printf("Hello World");
    return 0;
}`,
    },
    {
        name: "Rust",
        value: "rust",
        icon: rustIcon,
        code: `// Write your code here
fn main() {
    println!("Hello World");
}`
    },
    {
        name: "Go",
        value: "go",
        icon: goIcon,
        code: `// Write your code here
package main
import "fmt"
func main() {
    fmt.Println("Hello World")
}`
    },
    {
        name: "Php",
        value: "php",
        icon: phpIcon,
        code: `<?php
// Write your code here
echo "Hello World";
?>`
    }
];