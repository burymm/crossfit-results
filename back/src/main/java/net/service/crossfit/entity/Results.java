package net.service.crossfit.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "results")
public class Results implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "userId", unique = true)
    private int userId;

    @Column(name = "workoutDate")
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date workoutDate;

    @Column(name = "result", length = 255)
    private String result;

    @Column(name = "comment", length = 255)
    private String comment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "workoutType")
    private WorkoutType workoutType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "workoutExercise")
    private Exercises workoutExercise;

    public Results() {
    }

    @XmlElement
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @XmlElement
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @XmlElement
    public Date getWorkoutDate() {
        return workoutDate;
    }

    public void setWorkoutDate(Date workoutDate) {
        this.workoutDate = workoutDate;
    }

    @XmlElement
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @XmlElement
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @XmlElement
    public WorkoutType getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(WorkoutType workoutType) {
        this.workoutType = workoutType;
    }

    @XmlElement
    public Exercises getExercises() {
        return workoutExercise;
    }

    public void setExercises(Exercises exercises) {
        this.workoutExercise = exercises;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 17 * hash + this.id;
        hash = 17 * hash + this.userId;
        hash = 17 * hash + Objects.hashCode(this.workoutDate);
        hash = 17 * hash + Objects.hashCode(this.result);
        hash = 17 * hash + Objects.hashCode(this.comment);
        hash = 17 * hash + Objects.hashCode(this.workoutType);
        hash = 17 * hash + Objects.hashCode(this.workoutExercise);
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
        final Results other = (Results) obj;
        if (this.id != other.id) {
            return false;
        }
        if (this.userId != other.userId) {
            return false;
        }
        if (!Objects.equals(this.result, other.result)) {
            return false;
        }
        if (!Objects.equals(this.comment, other.comment)) {
            return false;
        }
        if (!Objects.equals(this.workoutDate, other.workoutDate)) {
            return false;
        }
        if (!Objects.equals(this.workoutType, other.workoutType)) {
            return false;
        }
        if (!Objects.equals(this.workoutExercise, other.workoutExercise)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Results{" + "id=" + id + ", userId=" + userId + ", workoutDate=" + workoutDate
                + ", result=" + result + ", comment=" + comment + ", workoutType=" + workoutType
                + ", exercises=" + workoutExercise + '}';
    }

}
