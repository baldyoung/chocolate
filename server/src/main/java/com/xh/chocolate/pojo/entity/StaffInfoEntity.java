package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StaffInfo")
@EntityListeners(AuditingEntityListener.class)
public class StaffInfoEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(length = 20)
    private String staffName;
    private Integer staffSex;
    private Date staffBirthday;
    @Column(length = 10)
    private String staffNation;
    @Column(length = 15)
    private String staffRace;
    @Column(length = 30)
    private String staffEmail;
    @Column(length = 20)
    private String staffPhoneNumber;
    @CreatedDate
    private Date createDateTime;
    @LastModifiedDate
    private Date updateDateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public Integer getStaffSex() {
        return staffSex;
    }

    public void setStaffSex(Integer staffSex) {
        this.staffSex = staffSex;
    }

    public Date getStaffBirthday() {
        return staffBirthday;
    }

    public void setStaffBirthday(Date staffBirthday) {
        this.staffBirthday = staffBirthday;
    }

    public String getStaffNation() {
        return staffNation;
    }

    public void setStaffNation(String staffNation) {
        this.staffNation = staffNation;
    }

    public String getStaffRace() {
        return staffRace;
    }

    public void setStaffRace(String staffRace) {
        this.staffRace = staffRace;
    }

    public String getStaffEmail() {
        return staffEmail;
    }

    public void setStaffEmail(String staffEmail) {
        this.staffEmail = staffEmail;
    }

    public String getStaffPhoneNumber() {
        return staffPhoneNumber;
    }

    public void setStaffPhoneNumber(String staffPhoneNumber) {
        this.staffPhoneNumber = staffPhoneNumber;
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
        return "StaffInfoEntity{" +
                "id=" + id +
                ", staffName='" + staffName + '\'' +
                ", staffSex=" + staffSex +
                ", staffBirthday=" + staffBirthday +
                ", staffNation='" + staffNation + '\'' +
                ", staffRace='" + staffRace + '\'' +
                ", staffEmail='" + staffEmail + '\'' +
                ", staffPhoneNumber='" + staffPhoneNumber + '\'' +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }
}
