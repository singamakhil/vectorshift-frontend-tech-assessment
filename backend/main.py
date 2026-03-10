from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Set

app = FastAPI()

# Add CORS middleware to allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Build adjacency list
    adj_list: Dict[str, List[str]] = {node.id: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        if edge.source in adj_list:
            adj_list[edge.source].append(edge.target)
    
    # DFS for cycle detection
    visited: Set[str] = set()
    rec_stack: Set[str] = set()
    
    def has_cycle(u: str) -> bool:
        visited.add(u)
        rec_stack.add(u)
        
        for v in adj_list.get(u, []):
            if v not in visited:
                if has_cycle(v):
                    return True
            elif v in rec_stack:
                return True
        
        rec_stack.remove(u)
        return False

    is_dag = True
    for node in pipeline.nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                is_dag = False
                break
                
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
