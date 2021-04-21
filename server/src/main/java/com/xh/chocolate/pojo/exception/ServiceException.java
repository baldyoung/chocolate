package com.xh.chocolate.pojo.exception;

public class ServiceException extends Exception {
    public ServiceException() {

    }
    public ServiceException(String desc) {
        super(desc);
    }
}
