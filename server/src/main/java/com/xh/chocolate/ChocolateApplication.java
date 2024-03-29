package com.xh.chocolate;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableCaching
// 指定mybatis的mapper映射接口所在的包(必要！）
@MapperScan("com.xh.chocolate.common.mybatisModule")
@EnableJpaAuditing
@SpringBootApplication
public class ChocolateApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChocolateApplication.class, args);
    }

}
