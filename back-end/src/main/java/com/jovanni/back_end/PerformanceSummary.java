package com.jovanni.back_end;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PerformanceSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private boolean treble;
    private boolean bass;
    private boolean sharp;
    private boolean flat;
    private int testTime;
    private boolean tempoMatch;
    private boolean sameLine;
    private int beatspermin;
    private boolean continueOnWrong;
    private float flatsharpPercentage;
    private int lineBreakLength;
    private int noteGenerationLength;
    private int bpmLeeway;
    private Long testDate;

    @ElementCollection
    private List<Float> bpms;

    @ElementCollection
    private List<String> trebleNotation;

    @ElementCollection
    private List<String> bassNotation;

    @ElementCollection
    private List<String> highlightArray;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public PerformanceSummary() {
    }

    public PerformanceSummary(User user, boolean treble, boolean bass, boolean sharp, boolean flat, int testTime, boolean tempoMatch, boolean sameLine, int beatspermin, boolean continueOnWrong, List<Float> bpms, List<String> trebleNotation, List<String> bassNotation, List<String> highlightArray, float flatsharpPercentage, int lineBreakLength, int noteGenerationLength, int bpmLeeway, Long testDate) {
        this.user = user;
        this.treble = treble;
        this.bass = bass;
        this.sharp = sharp;
        this.flat = flat;
        this.testTime = testTime;
        this.tempoMatch = tempoMatch;
        this.sameLine = sameLine;
        this.beatspermin = beatspermin;
        this.continueOnWrong = continueOnWrong;
        this.bpms = bpms;
        this.trebleNotation = trebleNotation;
        this.bassNotation = bassNotation;
        this.highlightArray = highlightArray;
        this.user = user;
        this.flatsharpPercentage = flatsharpPercentage;
        this.lineBreakLength = lineBreakLength;
        this.noteGenerationLength = noteGenerationLength;
        this.bpmLeeway = bpmLeeway;
        this.testDate = testDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public boolean getTreble() {
        return treble;
    }

    public void setTreble(boolean treble) {
        this.treble = treble;
    }

    public boolean getBass() {
        return bass;
    }

    public void setBass(boolean bass) {
        this.bass = bass;
    }

    public boolean getSharp() {
        return sharp;
    }

    public void setSharp(boolean sharp) {
        this.sharp = sharp;
    }

    public boolean getFlat() {
        return flat;
    }

    public void setFlat(boolean flat) {
        this.flat = flat;
    }

    public int getTestTime() {
        return testTime;
    }

    public void setTestTime(int testTime) {
        this.testTime = testTime;
    }

    public boolean getTempoMatch() {
        return tempoMatch;
    }

    public void setTempoMatch(boolean tempoMatch) {
        this.tempoMatch = tempoMatch;
    }

    public boolean getSameLine() {
        return sameLine;
    }

    public void setSameLine(boolean sameLine) {
        this.sameLine = sameLine;
    }

    public List<Float> getBpms() {
        return bpms;
    }

    public void setBpms(List<Float> bpms) {
        this.bpms = bpms;
    }

    public int getBeatspermin() {
        return beatspermin;
    }

    public void setBeatspermin(int beatspermin) {
        this.beatspermin = beatspermin;
    }

    public boolean getContinueOnWrong() {
        return continueOnWrong;
    }

    public void setContinueOnWrong(boolean continueOnWrong) {
        this.continueOnWrong = continueOnWrong;
    }

    public float getFlatsharpPercentage() {
        return flatsharpPercentage;
    }

    public void setFlatsharpPercentage(float flatsharpPercentage) {
        this.flatsharpPercentage = flatsharpPercentage;
    }

    public int getLineBreakLength() {
        return lineBreakLength;
    }

    public void setLineBreakLength(int lineBreakLength) {
        this.lineBreakLength = lineBreakLength;
    }

    public int getNoteGenerationLength() {
        return noteGenerationLength;
    }

    public void setNoteGenerationLength(int noteGenerationLength) {
        this.noteGenerationLength = noteGenerationLength;
    }

    public int getBpmLeeway() {
        return bpmLeeway;
    }

    public void setBpmLeeway(int bpmLeeway) {
        this.bpmLeeway = bpmLeeway;
    }

    public Long getTestDate() {
        return testDate;
    }

    public void setTestDate(Long testDate) {
        this.testDate = testDate;
    }

    public List<String> getTrebleNotation() {
        return trebleNotation;
    }

    public void setTrebleNotation(List<String> trebleNotation) {
        this.trebleNotation = trebleNotation;
    }

    public List<String> getBassNotation() {
        return bassNotation;
    }

    public void setBassNotation(List<String> bassNotation) {
        this.bassNotation = bassNotation;
    }

    public List<String> getHighlightArray() {
        return highlightArray;
    }

    public void setHighlightArray(List<String> highlightArray) {
        this.highlightArray = highlightArray;
    }

    public int getCorrectNotes() {
        List<String> highlightArray = getHighlightArray();
        int correctNotes = 0;

        for (String note : highlightArray) {
            if (note.equals("green")) {
                correctNotes++;
            }
        }

        return correctNotes;
    }

    public int getWrongNotes() {
        List<String> highlightArray = getHighlightArray();
        int wrongNotes = 0;

        for (String note : highlightArray) {
            if (note.equals("red")) {
                wrongNotes++;
            }
        }

        return wrongNotes;
    }
}
