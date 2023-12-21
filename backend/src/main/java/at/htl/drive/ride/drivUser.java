package at.htl.drive.ride;

import jakarta.persistence.*;

@Entity
public class drivUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(length = 100,nullable = false)
    public String firstName;
    @Column(length = 100,nullable = false)
    public String lastName;
    @Column(length = 100,nullable = false)
    public String phoneNr;
    @Column(length = 100,nullable = false)
    public String emailAddress;

    /*@OneToMany(mappedBy = "user")
    public List<RideUserAssociation> associationList;*/

    public drivUser() {
    }

    public drivUser(Long id, String firstName, String lastName, String phoneNr, String emailAddress) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNr = phoneNr;
        this.emailAddress = emailAddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
