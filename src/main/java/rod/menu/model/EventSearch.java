package rod.menu.model;

import java.time.Instant;

public class EventSearch {
	
	private Instant beginEvent;
	private Instant endEvent;
	
	public EventSearch() {
		super();
	}
	public EventSearch(Instant beginEvent, Instant endEvent) {
		super();
		this.beginEvent = beginEvent;
		this.endEvent = endEvent;
	}
	public Instant getBeginEvent() {
		return beginEvent;
	}
	public void setBeginEvent(Instant beginEvent) {
		this.beginEvent = beginEvent;
	}
	public Instant getEndEvent() {
		return endEvent;
	}
	public void setEndEvent(Instant endEvent) {
		this.endEvent = endEvent;
	}
	
	
	
}
