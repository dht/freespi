import {findRoot, identifyObject, trimObject} from "../utils/mana";
import {entities, rawEntities, root} from '../__mocks__/output';
import all from '../__mocks__/input';

test('identify answer', () => {
    expect(identifyObject(all.availabilities["38644"].answers["84684"])).toEqual(entities.answerItem);
});

it('identify eventLocation', () => {
    expect(identifyObject(all.availabilities["38644"].eventLocation)).toEqual(entities.eventLocationItem);
});

it('identify photoItem', () => {
    expect(identifyObject(all.events["28626"].myPhotos[0])).toEqual(entities.photoItem);
});

it('identify clockItem', () => {
    expect(identifyObject(all.events["28626"].clock)).toEqual(entities.clockItem);
});

it('identify eventItem', () => {
    expect(identifyObject(all.events["28626"])).toEqual(trimObject(rawEntities.eventItem, all.events["28626"]));
    expect(identifyObject(all.approvals["28587"])).toEqual(trimObject(rawEntities.eventItem, all.approvals["28587"]));
    expect(identifyObject(all.availabilities["38644"])).toEqual(trimObject(rawEntities.eventItem, all.availabilities["38644"]));
});

it('find root', () => {
    expect(findRoot(all)).toEqual(root);
});
