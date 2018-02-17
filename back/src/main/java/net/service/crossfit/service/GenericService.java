package net.service.testcrossfitresult.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.CriteriaQuery;
import net.service.testcrossfitresult.dao.IGenericDao;
import net.service.testcrossfitresult.util.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;

public class GenericService<T> implements IGenericDao<T> {

    private final Class<T> type;

    public GenericService(Class<T> type) {
        this.type = type;
    }

    @Override
    public void add(T entity) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.sessionFactory.openSession();
            session.beginTransaction();
            session.save(entity);
            session.getTransaction().commit();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            e.printStackTrace();
        } finally {
            if ((session != null) && session.isOpen()) {
                session.close();
            }
        }

    }

    @Override
    public void update(T entity) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.getSessionFactrory().openSession();
            session.beginTransaction();
            session.update(entity);
            session.getTransaction().commit();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            e.printStackTrace();
        } finally {
            if ((session != null) && session.isOpen()) {
                session.close();
            }
        }
    }

    @Override
    public T findById(int id) throws SQLException {
        Session session = null;
        T value = null;
        try {
            session = HibernateUtil.getSessionFactrory().openSession();
            session.beginTransaction();
            value = session.get(type, id);
            session.getTransaction().commit();
        } catch (HibernateException e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
           if ((session != null) && session.isOpen()) {
                session.close();
            }
        }
        return value;
    }

    @Override
    public List<T> findAll() throws SQLException {
        Session session = null;
        List<T> values = new ArrayList<>();
        try {
            session = HibernateUtil.sessionFactory.openSession();
            session.beginTransaction();
            CriteriaQuery cq = session.getCriteriaBuilder().createQuery(type);
            cq.from(type);
            values = session.createQuery(cq).getResultList();
            session.getTransaction().commit();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            e.printStackTrace();
        } finally {
            if ((session != null) && session.isOpen()) {
                session.close();
            }
        }
        
        return values;
        
    }

    @Override
    public void remove(T entity) throws SQLException {
        Session session = null;
        try {
            session = HibernateUtil.sessionFactory.openSession();
            session.beginTransaction();
            session.delete(entity);
            session.getTransaction().commit();
        } catch (HibernateException e) {
            session.getTransaction().rollback();
            e.printStackTrace();
        } finally {
            if((session!=null)&& session.isOpen()) {
                session.close();
            }
        }
    }
    
}
