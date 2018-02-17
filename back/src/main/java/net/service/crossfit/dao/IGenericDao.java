
package net.service.testcrossfitresult.dao;

import java.sql.SQLException;
import java.util.List;

public interface IGenericDao<T> {
    
    public void add(T entity) throws SQLException;
    
    public void update(T entity) throws SQLException;
    
    public T findById(int id) throws SQLException;
    
    public List<T> findAll() throws SQLException;
    
    public void remove(T entity) throws SQLException;
    
    
    
}
