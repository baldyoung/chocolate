package com.xh.chocolate;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;


@EnableCaching
// 指定mybatis的mapper映射接口所在的包(必要！）
@MapperScan("com.xh.chocolate.common.daoModule")
@SpringBootApplication
public class ChocolateApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChocolateApplication.class, args);
    }

}
