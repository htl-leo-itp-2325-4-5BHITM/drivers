package at.htl.drive.ride.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class DrivUser {
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
    @Column(length = 100,nullable = false)
    public String username;
    @Column(length = 100,nullable = false)
    public String password;
    @Column
    public String img;

    @Column
    @Lob
    public byte[] profilePicture;

    @Column
    public Long stars;
    @Column
    public Long ratingCount;

    @OneToMany(mappedBy = "user")
    public List<Ride> rides;
    public DrivUser() {
    }

    public DrivUser(String firstName, String lastName, String phoneNr, String emailAddress, String username, String password, byte[] profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNr = phoneNr;
        this.emailAddress = emailAddress;
        this.username = username;
        this.password = password;
        this.profilePicture = profilePicture;
    }

    public DrivUser(Long id, String firstName, String lastName, String phoneNr, String emailAddress, String username, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNr = phoneNr;
        this.emailAddress = emailAddress;
        this.username = username;
        this.password = password;
    }

    public DrivUser(String firstName, String lastName, String phoneNr, String emailAddress, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNr = phoneNr;
        this.emailAddress = emailAddress;
        this.username = username;
        this.password = password;
    }

    public byte[] getProfileImage() {
        return this.profilePicture;
    }

    public void setProfileImage(byte[] profilePicture) {
        this.profilePicture = profilePicture;
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

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Long getStars() {
        return stars;
    }

    public void setStars(Long stars) {
        if(this.stars == null) {
            this.ratingCount = Long.valueOf(0);
            this.stars = Long.valueOf(0);
        }
        this.ratingCount++;
        this.stars += stars;
        this.stars = this.stars/this.ratingCount;
    }

    public Long getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Long ratingCount) {
        this.ratingCount = ratingCount;
    }
}
