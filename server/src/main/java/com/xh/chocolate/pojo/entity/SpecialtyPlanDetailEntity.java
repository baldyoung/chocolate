package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="SpecialtyPlanDetail")
@EntityListeners(AuditingEntityListener.class)
public class SpecialtyPlanDetailEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Integer specialtyPlanId;
    private Integer subjectId;
    private Integer referenceHours;
    private Integer sortParament;
    @CreatedDate
    private Date createDateTime;
    @LastModifiedDate
    private Date updateDateTime;

    public SpecialtyPlanDetailEntity(Integer specialtyPlanId, Integer referenceHours, Integer sortParament, Date createDateTime, Date updateDateTime) {
        this.specialtyPlanId = specialtyPlanId;
        this.referenceHours = referenceHours;
        this.sortParament = sortParament;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }

    public SpecialtyPlanDetailEntity() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSpecialtyPlanId() {
        return specialtyPlanId;
    }

    public void setSpecialtyPlanId(Integer specialtyPlanId) {
        this.specialtyPlanId = specialtyPlanId;
    }

    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    public Integer getReferenceHours() {
        return referenceHours;
    }

    public void setReferenceHours(Integer referenceHours) {
        this.referenceHours = referenceHours;
    }

    public Integer getSortParament() {
        return sortParament;
    }

    public void setSortParament(Integer sortParament) {
        this.sortParament = sortParament;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    @Override
    public String toString() {
        return "SpecialtyPlanDetailEntity{" +
                "id=" + id +
                ", specialtyPlanId=" + specialtyPlanId +
                ", subjectId=" + subjectId +
                ", referenceHours=" + referenceHours +
                ", sortParament=" + sortParament +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }
}
