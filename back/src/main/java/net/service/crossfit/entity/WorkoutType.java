package net.service.testcrossfitresult.entity;

import com.google.gson.annotations.Expose;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "workoutType")
public class WorkoutType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    @Column(name = "name",length = 50)
    private String name;
    
    @Column(name="description", length = 150)
    private String description;

    @Expose
    @OneToMany(mappedBy = "workoutType", cascade = CascadeType.ALL)
    private Set<Results> resultsSet;
    
    public WorkoutType() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public void setDescription(String describtion) {
        this.description = describtion;
    }

    public Set<Results> getResultsSet() {
        return resultsSet;
    }

    public void setResultsSet(Set<Results> resultsSet) {
        this.resultsSet = resultsSet;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + this.id;
        hash = 47 * hash + Objects.hashCode(this.name);
        hash = 47 * hash + Objects.hashCode(this.description);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final WorkoutType other = (WorkoutType) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "WorkoutType{" + "id=" + id + ", name=" + name + ", describtion=" + description + '}';
    }
    
    

    
}
