/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.service.crossfit.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author andrey
 */
@Entity
@Table(name = "workoutType")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WorkoutType.findAll", query = "SELECT w FROM WorkoutType w")
    , @NamedQuery(name = "WorkoutType.findById", query = "SELECT w FROM WorkoutType w WHERE w.id = :id")
    , @NamedQuery(name = "WorkoutType.findByName", query = "SELECT w FROM WorkoutType w WHERE w.name = :name")
    , @NamedQuery(name = "WorkoutType.findByDescription", query = "SELECT w FROM WorkoutType w WHERE w.description = :description")})
public class WorkoutType implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "name")
    private String name;
    @Size(max = 150)
    @Column(name = "description")
    private String description;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "workoutType")
    private Collection<Results> resultsCollection;

    public WorkoutType() {
    }

    public WorkoutType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @XmlTransient
    public Collection<Results> getResultsCollection() {
        return resultsCollection;
    }

    public void setResultsCollection(Collection<Results> resultsCollection) {
        this.resultsCollection = resultsCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WorkoutType)) {
            return false;
        }
        WorkoutType other = (WorkoutType) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "net.service.crossfit.entity.WorkoutType[ id=" + id + " ]";
    }
    
}
