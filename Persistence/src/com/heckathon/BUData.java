package com.heckathon;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;

public class BUData extends HttpServlet {

private static final long serialVersionUID = 1L;

public BUData() {
    super();
}
protected void doGet(HttpServletRequest aRequest,
            HttpServletResponse response) throws ServletException, IOException {
	 response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	   // out.println("test");
	Mongo mongoClient = new Mongo("localhost", 27017);
	DB db = mongoClient.getDB("test");
	DBCollection table = db.getCollection("BUData");
	DBCursor cursorFind = table.find(null,new BasicDBObject("_id",0));
	String t = com.mongodb.util.JSON.serialize(cursorFind);
	out.print(t);
	/*while (cursorFind.hasNext()) {
		out.print(cursorFind.next() + ",");
	}*/
	
	//out.println(cursorFind.toString());
    }
	
}