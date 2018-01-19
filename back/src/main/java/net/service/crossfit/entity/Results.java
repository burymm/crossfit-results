/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.service.crossfit.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author andrey
 */
@Entity
@Table(name = "results")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Results.findAll", query = "SELECT r FROM Results r")
    , @NamedQuery(name = "Results.findById", query = "SELECT r FROM Results r WHERE r.id = :id")
    , @NamedQuery(name = "Results.findByUserId", query = "SELECT r FROM Results r WHERE r.userId = :userId")
    , @NamedQuery(name = "Results.findByWorkoutDate", query = "SELECT r FROM Results r WHERE r.workoutDate = :workoutDate")
    , @NamedQuery(name = "Results.findByResult", query = "SELECT r FROM Results r WHERE r.result = :result")
    , @NamedQuery(name = "Results.findByComment", query = "SELECT r FROM Results r WHERE r.comment = :comment")})
public class Results implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "userId")
    private Integer userId;
    @Column(name = "workoutDate")
    @Temporal(TemporalType.DATE)
    private Date workoutDate;
    @Size(max = 255)
    @Column(name = "result")
    private String result;
    @Size(max = 255)
    @Column(name = "comment")
    private String comment;
    @JoinColumn(name = "workoutType", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private WorkoutType workoutType;
    @JoinColumn(name = "workoutExercise", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Exercises workoutExercise;

    public Results() {
    }

    public Results(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getWorkoutDate() {
        return workoutDate;
    }

    public void setWorkoutDate(Date workoutDate) {
        this.workoutDate = workoutDate;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public WorkoutType getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(WorkoutType workoutType) {
        this.workoutType = workoutType;
    }

    public Exercises getWorkoutExercise() {
        return workoutExercise;
    }

    public void setWorkoutExercise(Exercises workoutExercise) {
        this.workoutExercise = workoutExercise;
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
        if (!(object instanceof Results)) {
            return false;
        }
        Results other = (Results) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "net.service.crossfit.entity.Results[ id=" + id + " ]";
    }
    
}
