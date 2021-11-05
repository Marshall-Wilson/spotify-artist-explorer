class BfsArtist {
    constructor(artist, prev, prevCollab) {
        this.artist = artist;
        this.prev = prev;
        this.id = artist.id;
        this.prevCollab = prevCollab
    }

    getPredecessors() {
        if (this.prev === null) {
            return [this];
        }
        let preds = [this];
        preds = preds.concat(this.prev.getPredecessors());
        return preds;
    }
}

export default BfsArtist