# Tasks
- Added info about guesses (green/yellow)
  - Add to keyboard
  - Add to guesses
- Add win condition
- Add lose condition
- Get list of valid 5 letter words
    - Deny fake words for guesses
    - Generate random target word from list
- Bug: character showing as yellow when character is already correctly placed
  - Example
    - Target: BAGEL
    - Guess: BIBLE
    - Colors would be G,B,Y,Y,Y
    - Expected: G,B,B,Y,Y
    - Second B showing as yellow even though first B placed correctly