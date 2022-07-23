import { types } from 'node-sass';

export interface TransferNode extends Node {
  __transferNode?: Node;
  __transferElement?: Node;
}

const events: Map<string, Set<TransferNode>> = new Map();

export function getObservers(type: string) {
  return events.get(type) ?? events.set(type, new Set()).get(type)!;
}

export function observe(el: TransferNode, types: string | string[]) {
  let newTypes = types;
  if (typeof newTypes === 'string') {
    newTypes = [types as string];
  }

  if (Array.isArray(newTypes)) {
    for (const type of newTypes) {
      if (!events.has(type)) {
        events.set(type, new Set());
      }

      events.get(type)!.add(el);
    }
  }
}

export function disconnect(el: TransferNode, types: string | string[]) {
  let newTypes = types;
  if (typeof newTypes === 'string') {
    newTypes = [types as string];
  }

  if (Array.isArray(newTypes)) {
    for (const type of newTypes) {
      if (!events.has(type)) {
        events.get(type)?.delete(el);
      }
    }
  }
}
