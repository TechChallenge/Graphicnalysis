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

/**
 * Servlet implementation class ReportUsage
 */
public class ReportUsage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReportUsage() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
	    PrintWriter out = response.getWriter();
	   // out.println("test");
	Mongo mongoClient = new Mongo("localhost", 27017);
	DB db = mongoClient.getDB("test");
	DBCollection table = db.getCollection("ReportUsage");
	DBCursor cursorFind = table.find(null,new BasicDBObject("_id",0));
	String t = com.mongodb.util.JSON.serialize(cursorFind);
	out.print(t);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
