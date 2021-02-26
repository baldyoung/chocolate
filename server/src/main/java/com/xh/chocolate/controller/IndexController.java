package com.xh.chocolate.controller;

import com.xh.chocolate.pojo.dto.ResponseResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 项目默认访问接口集
 */
@RestController
public class IndexController {

    @GetMapping
    public void defaultRequest(HttpServletResponse response) throws IOException {
        response.sendRedirect("index.html");
    }

    @GetMapping({"index", "index.html"})
    public void requestIndex(HttpServletResponse response) throws IOException {
        // 指定返回的数据类型
        response.setHeader("Content-Type", "text/html");
        // 指定返回数据的编码格式（必须！如果内容中涉及中文，一定要在使用输出流输出之前设置！）
        response.setCharacterEncoding("utf-8");
        PrintWriter writer = response.getWriter();
        String html = "<html>" +
                "<head>"+
                "<meta charset='utf-8' />"+
                "</head>"+
                "<body style='text-align:center; color:red;'>"+
                "<h1><b>chocolate</b></h1><h3><b style='color:green;'>江西新华课程系统</b></h3></br>2021-01-20" +
                "<script>setTimeout(function(){window.location.replace(\"university/index.html\");}, 2000);</script>" +
                "</body>"+
                "</html>";
        writer.println(html);
    }


}
