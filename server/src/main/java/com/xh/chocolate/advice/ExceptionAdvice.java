package com.xh.chocolate.advice;

import com.xh.chocolate.pojo.dto.ResponseResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

import static com.xh.chocolate.pojo.dto.ResponseResult.error;

/**
 * 统一异常拦截器
 */
@ControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseResult doException(HttpServletResponse response, Exception exception) {
        return error(exception.getMessage());
    }
}
