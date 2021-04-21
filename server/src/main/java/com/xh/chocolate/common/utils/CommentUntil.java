package com.xh.chocolate.common.utils;

import java.util.Collection;

public class CommentUntil {

    public static boolean isEmpty(Object o) {
        if (null == o) {
            return true;
        }
        if (o instanceof Collection && 0 == ((Collection)o).size()) {
            return true;
        }
        if (o instanceof  String && 0 == ((String)o).length()) {
            return true;
        }
        return false;
    }
}
