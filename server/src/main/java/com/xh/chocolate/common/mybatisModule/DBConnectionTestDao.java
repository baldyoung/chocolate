package com.xh.chocolate.common.mybatisModule;

import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface DBConnectionTestDao {

    Map showDataBaseCreateSQL();
}
