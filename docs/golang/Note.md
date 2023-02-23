# 创建模块化，create module,

## 1.根目录下新建一个项目 hello.go

```bash
mkdir /docs/hello/
cd /docs/hello/
#初始化hello文件 会生成go.mod 相当于package.json
go mod init hello
#创建运行文件，一个项目只有一个main
vim hello.go
```

在hello.go里输入以下内容:
```go
package main 

import ( 
    "fmt" 
    "log" 

    "example.com/greetings" 
) 

func main() { 
    // 设置预定义记录器的属性，包括
    // 日志条目前缀和禁用打印的标志
    // 时间，源文件和行号。
    log.SetPrefix("greetings: ") 
    log.SetFlags(0) 

    // 请求问候消息。
    消息，错误 := greetings.Hello("Gladys")
    // 如果返回错误，将其打印到控制台并
    // 退出程序。
    if err != nil { 
        log.Fatal(err) 
    } 

    // 如果没有返回错误，将返回的消息
    // 打印到控制台。
    fmt.Println(消息) 
}
```


### 2.根目录下创建一个模块/函数 greetings.go
packpage 必须是模块的名称 greetings，类似于函数名称，模块名称

```bash
mkdir /docs/greetings/
cd /docs/greetings/
#初始化greetings项目 会生成go.mod 相当于package.json
go mod init greetings
#创建运行文件，一个项目只有一个main
vim greetings.go
```

在greetings.go里输入以下内容:
```go
package greetings

import (
    "errors"
    "fmt"
    "math/rand"
    "time"
)

// Hello returns a greeting for the named person.
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return name, errors.New("empty name")
    }
    // Create a message using a random format.
    //声明一个变量，来调用随机函数
    message := fmt.Sprintf(randomFormat(), name)
    return message, nil
}

// init sets initial values for variables used in the function.
func init() {
    rand.Seed(time.Now().UnixNano())
}

// randomFormat returns one of a set of greeting messages. The returned
// message is selected at random.
// 定义随机函数
func randomFormat() string {
    // A slice of message formats.
    formats := []string{
        "Hi, %v. Welcome!",
        "Great to see you, %v!",
        "Hail, %v! Well met!",
    }

    // Return a randomly selected message format by specifying
    // a random index for the slice of formats.
    return formats[rand.Intn(len(formats))]
}
```

### 3.在hello文件夹里生成模块链接

```bash
cd /docs/hello
go mod tidy
# go: found example.com/greetings in example.com/greetings v0.0.0-00010101000000-000000000000
```
这会在/docs/hello/go.mod里生成这条信息，这个就是连接greetings模块的信息，v后面是版本号

### 4.运行模块

```bash
cd /docs/hello
go run .
# Great to see you, Gladys!
go run .
# Hail, Gladys! Well met!
go run .
# Hi, Gladys. Welcome!
```

# 多模块工作区